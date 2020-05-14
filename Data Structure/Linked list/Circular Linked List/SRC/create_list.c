/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create_list.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 15:31:11 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 15:45:03 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "circular_list.h"

t_list		*create_list(t_list *list)
{
	if (!(list = malloc(sizeof(t_list))))
		return (NULL);
	list->size = 0;
	list->tail = NULL;
	return (list);
}
