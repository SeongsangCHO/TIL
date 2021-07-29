/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   peek.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 21:12:53 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 21:27:19 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

t_node	*peek(t_stack *stack)
{
	if (stack == NULL || stack->size == 0 || stack->top == NULL)
		return (NULL);
	return (stack->top);
}
