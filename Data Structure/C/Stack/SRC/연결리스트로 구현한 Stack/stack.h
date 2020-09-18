/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   stack.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 15:31:31 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 21:24:40 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef STACK_H
# define STACK_H

# include <stdio.h>
# include <stdlib.h>

typedef	struct	s_node
{
	int	data;
	struct s_node *next;
}				t_node;

typedef struct s_stack
{
	t_node *top;
	int		size;
}				t_stack;
t_stack			*init_stack(void);
t_node			*create_node(int data);
void			push(t_stack *stack, int data);
void			pop(t_stack *stack);
void			isEmpty(t_stack *stack);
t_node			*peek(t_stack *stack);
int				stack_size(t_stack *stack);
void			clear(t_stack *stack);
#endif
