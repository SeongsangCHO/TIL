/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   stack.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 12:07:21 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 12:37:57 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   stack.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 12:07:20 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 12:07:20 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef STACK_H
# define STACK_H
# define LEN 10
# include <stdio.h>
# include <stdlib.h>

typedef struct s_stack
{
	int top;
	int data[LEN];
}				t_stack;

t_stack	*stack_init();
int		isEmpty(t_stack *stack);
void	push(t_stack *stack, int value);
void	pop(t_stack *stack);
int		peek(t_stack *stack);
void	print_stack(t_stack *stack);
void	clear(t_stack *stack);
#endif
